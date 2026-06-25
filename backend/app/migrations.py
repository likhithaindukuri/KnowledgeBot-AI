import uuid

from sqlalchemy import inspect, text

from app.database import engine
from app.models import Organization


def run_startup_migrations() -> None:
    inspector = inspect(engine)
    if "organizations" not in inspector.get_table_names():
        return

    columns = {column["name"] for column in inspector.get_columns("organizations")}

    if "widget_token" not in columns:
        with engine.begin() as connection:
            connection.execute(
                text(
                    "ALTER TABLE organizations "
                    "ADD COLUMN widget_token VARCHAR(36)"
                )
            )

    with engine.begin() as connection:
        rows = connection.execute(
            text("SELECT id FROM organizations WHERE widget_token IS NULL")
        ).fetchall()

        for row in rows:
            connection.execute(
                text(
                    "UPDATE organizations SET widget_token = :token WHERE id = :org_id"
                ),
                {"token": str(uuid.uuid4()), "org_id": row[0]},
            )

        connection.execute(
            text(
                "CREATE UNIQUE INDEX IF NOT EXISTS ix_organizations_widget_token "
                "ON organizations (widget_token)"
            )
        )

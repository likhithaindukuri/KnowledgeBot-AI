from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from app.auth import create_access_token, hash_password, verify_password
from app.config import ALLOWED_ORIGINS, BASE_DIR
from app.database import Base, engine
from app.dependencies import get_current_organization, get_db
from app.migrations import run_startup_migrations
from app.models import Organization
from app.routers import chat, documents, platform, widget
from app.schemas import AuthResponse, OrganizationCreate, OrganizationLogin, OrganizationResponse
from app.utils import generate_slug, unique_slug

app = FastAPI(title="Nexus")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

run_startup_migrations()
Base.metadata.create_all(bind=engine)

static_dir = BASE_DIR / "app" / "static"
static_dir.mkdir(exist_ok=True)
app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

app.include_router(documents.router)
app.include_router(widget.router)
app.include_router(chat.router)
app.include_router(platform.router)


@app.get("/")
def home():
    return {"message": "Nexus Backend Running"}


@app.get("/widget.js")
def serve_widget():
    widget_path = static_dir / "widget.js"
    if not widget_path.exists():
        raise HTTPException(status_code=404, detail="Widget not found")
    return FileResponse(widget_path, media_type="application/javascript")


@app.post("/register", response_model=AuthResponse)
def register(data: OrganizationCreate, db: Session = Depends(get_db)):
    existing_email = db.query(Organization).filter(Organization.email == data.email).first()

    if existing_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    existing_slugs = {row[0] for row in db.query(Organization.slug).all()}
    base_slug = generate_slug(data.name)
    slug = unique_slug(base_slug, existing_slugs)

    organization = Organization(
        name=data.name,
        slug=slug,
        email=data.email,
        password=hash_password(data.password),
    )

    db.add(organization)
    db.commit()
    db.refresh(organization)

    token = create_access_token(str(organization.id), organization.slug)

    return AuthResponse(
        access_token=token,
        organization=OrganizationResponse.model_validate(organization),
    )


@app.post("/login", response_model=AuthResponse)
def login(data: OrganizationLogin, db: Session = Depends(get_db)):
    organization = db.query(Organization).filter(Organization.email == data.email).first()

    if not organization or not verify_password(data.password, organization.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    token = create_access_token(str(organization.id), organization.slug)

    return AuthResponse(
        access_token=token,
        organization=OrganizationResponse.model_validate(organization),
    )


@app.get("/me", response_model=OrganizationResponse)
def me(organization: Organization = Depends(get_current_organization)):
    return OrganizationResponse.model_validate(organization)

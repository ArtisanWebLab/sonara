export const VOCABULARY_TEMPLATE = `# Project vocabulary for Whisper
#
# List technical terms, proper names, and jargon specific to this project - one per line.
# Whisper will be biased toward recognizing these words.
# Lines starting with # are ignored. Keep it under ~150 active terms (Whisper's context window).
#
# The list below ships with sensible defaults for a typical web/devops developer.
# Delete sections you don't need, add your own brand names, libraries, internal jargon.

# Languages
PHP
Python
TypeScript
JavaScript
Go
Rust
YAML
JSON
Markdown

# Web frameworks and libraries
Laravel
Inertia
React
Vue
Svelte
Next.js
Tailwind
Vite
Webpack
FastAPI
Django
Express
Livewire
shadcn

# Backend / runtime
Node.js
npm
pnpm
yarn
Composer
PHPUnit
Pint
ESLint
Prettier
Ruff

# Databases and queues
PostgreSQL
Postgres
MySQL
SQLite
Redis
Horizon
Telescope

# DevOps / infrastructure
Docker
Compose
Kubernetes
Helm
Ansible
Terraform
Nginx
systemd
cron
SSH
TLS
HTTPS
DNS
CDN

# Cloud and hosting
AWS
GCP
Azure
S3
EC2
Cloudflare
Vercel
Netlify
Hetzner
Contabo
DigitalOcean
Proxmox

# SaaS / messaging / monitoring
Telegram
Slack
Discord
Stripe
Sentry
Grafana
Prometheus
Loki

# OS and tooling
Linux
Fedora
Ubuntu
Debian
macOS
Windows
WSL
Wayland
PipeWire
PulseAudio
parecord
arecord

# Source control and CI
Git
GitHub
GitLab
Bitbucket
gitignore
PR
diff
rebase
squash
merge
branch
commit
revert
upstream

# Architecture / patterns
API
REST
WebSocket
OAuth
JWT
CORS
CSRF
XSS
DTO
ORM
CRUD
multi-tenant
webhook
middleware
migration
seeder
factory

# Project-specific (Sonara Voice)
Whisper
faster-whisper
CUDA
GPU
VRAM
MailPit
Sail
Wayfinder
symlink
adaptive
streaming
transcribe
transcription
dictation
vocabulary
extension
webview
vsix
marketplace

# Place your own terms below this line:
`;

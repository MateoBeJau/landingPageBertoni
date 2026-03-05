# Debug del Sistema - FotoPlatform Multi-tenant

**Fecha:** 2025-02-28

---

## 1. Cambios realizados

### Soporte para `www`
- **`lib/tenant.ts`**: Ahora `www.alvarosanguinetti.com` resuelve al mismo tenant que `alvarosanguinetti.com`.
- Se buscan: `domain` exacto, `domain` sin www, y `slug` (primera parte del host sin www).

---

## 2. Estado del sistema

### ✅ Auth
| Componente | Estado | Notas |
|------------|--------|-------|
| Admin login | OK | `/admin/login` → POST `/api/admin/auth` |
| Panel login | OK | `/panel/login` → POST `/api/panel/auth` |
| Panel password | OK | `/api/panel/password` PUT para cambiar contraseña |
| Cookies | OK | `admin_token` y `panel_token` separados |

### ✅ Multi-tenant
| Componente | Estado | Notas |
|------------|--------|-------|
| Middleware | OK | Excluye `/admin`, `/panel`, APIs |
| Resolución por dominio | OK | `domain` o `slug` en DB |
| Soporte www | OK | `www.dominio.com` → mismo tenant |
| Fallback localhost | OK | Muestra "Site não encontrado" si no hay tenant |

### ✅ APIs
| Ruta | Métodos | Auth | Estado |
|------|---------|------|--------|
| `/api/admin/auth` | GET, POST, DELETE | - | OK |
| `/api/admin/tenants` | GET, POST | Admin | OK |
| `/api/admin/tenants/[id]` | GET, PUT, DELETE | Admin | OK |
| `/api/admin/tenant-users` | GET, POST | Admin | OK |
| `/api/admin/tenant-users/[id]` | PUT, DELETE | Admin | OK |
| `/api/admin/photos` | POST | Admin | OK |
| `/api/admin/photos/[id]` | PUT, DELETE | Admin | OK |
| `/api/admin/series` | POST | Admin | OK |
| `/api/admin/series/[id]` | PUT, DELETE | Admin | OK |
| `/api/admin/ensaios` | POST | Admin | OK |
| `/api/admin/ensaios/[id]` | PUT, DELETE | Admin | OK |
| `/api/admin/upload` | POST | Admin | OK |
| `/api/panel/auth` | GET, POST, DELETE | - | OK |
| `/api/panel/profile` | GET, PUT | Panel | OK |
| `/api/panel/photos` | GET, POST | Panel | OK |
| `/api/panel/photos/[id]` | PUT, DELETE | Panel | OK |
| `/api/panel/series` | GET, POST | Panel | OK |
| `/api/panel/series/[id]` | PUT, DELETE | Panel | OK |
| `/api/panel/ensaios` | GET, POST | Panel | OK |
| `/api/panel/ensaios/[id]` | PUT, DELETE | Panel | OK |
| `/api/panel/upload` | POST | Panel | OK |
| `/api/panel/password` | PUT | Panel | OK |

### ✅ Upload (Vercel Blob)
| Ruta | Estado | Notas |
|------|--------|-------|
| Admin upload | OK | `addRandomSuffix: true`, `access: "public"` |
| Panel upload | OK | Carpeta `tenants/{tenantId}/` |

---

## 3. Variables de entorno requeridas

| Variable | Uso | Producción |
|----------|-----|------------|
| `DATABASE_URL` | Prisma / Neon | ✅ Obligatorio |
| `JWT_SECRET` | Tokens admin + panel | ⚠️ Cambiar por uno aleatorio fuerte |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob | ✅ Obligatorio si hay uploads |

**Importante:** En producción, `JWT_SECRET` debe ser una cadena aleatoria de al menos 32 caracteres.

---

## 4. Checklist para dominio real

- [ ] Dominio guardado en el tenant (ej: `alvarosanguinetti.com`, sin `https://`)
- [ ] Tenant activo
- [ ] DNS apuntando al hosting (CNAME a Vercel si aplica)
- [ ] Dominio agregado en Vercel (Project Settings → Domains)
- [ ] Variables de entorno configuradas en Vercel

---

## 5. Desarrollo local

- **`localhost`**: No matchea ningún tenant → "Site não encontrado".
- **Prueba con dominio local**: Agregar en `C:\Windows\System32\drivers\etc\hosts`:
  ```
  127.0.0.1 alvaro.localhost
  ```
  Luego visitar `http://alvaro.localhost:3000` (busca tenant con slug `alvaro`).

---

## 6. Correcciones aplicadas

- **Crear usuario al crear tenant**: Si falla (ej. email duplicado), se muestra el error y el tenant ya queda creado. El usuario se puede agregar después en la pestaña Usuários.

---

## 7. Posibles mejoras (no críticas)

1. **Redirect www → sin www**: En Vercel se puede configurar redirect de `www.dominio.com` a `dominio.com`.
2. **`.env.example`**: Crear archivo con las variables necesarias (sin valores sensibles).
3. **Rate limiting**: Considerar en login para evitar fuerza bruta.
4. **Validación de dominio**: Evitar caracteres inválidos al guardar el dominio.

---

## 8. Resumen

El sistema está operativo. Con dominio real configurado en el tenant, DNS y Vercel, debería funcionar correctamente. El soporte para `www` ya está implementado.

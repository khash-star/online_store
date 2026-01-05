# Database Үүсгэх

## Database үүсгэх аргууд:

### Арга 1: Command Line
```powershell
# PostgreSQL path нэмэх
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"

# PostgreSQL-д холбогдох
psql -U postgres

# Database үүсгэх
CREATE DATABASE onlineshop;

# Verify
\l

# Гарах
\q
```

### Арга 2: pgAdmin 4
1. Left pane-д "Databases" дээр right click
2. "Create" → "Database..."
3. Database name: `onlineshop`
4. "Save"

### Арга 3: createdb command
```powershell
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"
createdb -U postgres onlineshop
```


```bash
dotnet dev-certs https --trust
dotnet watch run
dotnet tool install --global dotnet-ef --version 5.0.13
dotnet ef migrations add InitialCreate -o Data/Migrations
dotnet ef database update
```
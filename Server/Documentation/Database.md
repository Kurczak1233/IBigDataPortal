To create migration you have to add a start-up project
as well as a project where the database exists.
For this reason be sure that when you run a console command.

Update database: 
dotnet ef database update -s ./Portal -p ./Portal.Database

Add migration:
dotnet ef migrations add MigrationName -s ./Portal -p ./Portal.Database

s
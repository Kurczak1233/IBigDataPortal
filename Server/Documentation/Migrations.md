There are few options:
You can manually generate script from the original database and then apply the script in the prod database.
Below will you find an instruction how to apply one:
https://acumenvelocity.com/cloud-blog/how-to-migrate-your-sql-server-to-gcp/

First step: Build project and make sure that the connection string is: 
Server=34.133.157.101;Database=portal-database;Uid=migrationsUser;Password=migrationsUser;

Second step: Apply the migrations on the production database:
dotnet ef database update -s ./Portal -p ./Portal.Database

Remember that we do not want to lose the production data so do not remove it after we introduce users!

Unfortunately, google cloud cli and google cloud sql proxy are too complicated to introduce CI/CD for automatically updating the migrations on the prod database, so I refrain from further development in this way.
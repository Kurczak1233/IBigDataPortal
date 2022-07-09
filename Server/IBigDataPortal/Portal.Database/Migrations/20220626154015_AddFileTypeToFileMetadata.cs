using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IBigDataPortal.Database.Migrations
{
    public partial class AddFileTypeToFileMetadata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileType",
                table: "FilesMetadata",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileType",
                table: "FilesMetadata");
        }
    }
}

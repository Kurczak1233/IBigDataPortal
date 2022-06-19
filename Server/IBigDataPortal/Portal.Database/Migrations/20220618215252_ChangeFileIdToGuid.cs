using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IBigDataPortal.Database.Migrations
{
    public partial class ChangeFileIdToGuid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_FilesMetadata",
                table: "FilesMetadata");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "FilesMetadata");

            migrationBuilder.AddColumn<Guid>(
                name: "Guid",
                table: "FilesMetadata",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_FilesMetadata",
                table: "FilesMetadata",
                column: "Guid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_FilesMetadata",
                table: "FilesMetadata");

            migrationBuilder.DropColumn(
                name: "Guid",
                table: "FilesMetadata");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "FilesMetadata",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FilesMetadata",
                table: "FilesMetadata",
                column: "Id");
        }
    }
}

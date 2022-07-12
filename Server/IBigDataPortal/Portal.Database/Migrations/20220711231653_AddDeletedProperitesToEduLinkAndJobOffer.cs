using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IBigDataPortal.Database.Migrations
{
    public partial class AddDeletedProperitesToEduLinkAndJobOffer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeletedBy",
                table: "JobOffers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "DeletedOn",
                table: "JobOffers",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IsDeleted",
                table: "JobOffers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DeletedBy",
                table: "EduLinks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "DeletedOn",
                table: "EduLinks",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IsDeleted",
                table: "EduLinks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "JobOffers");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "JobOffers");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "JobOffers");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EduLinks");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EduLinks");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EduLinks");
        }
    }
}

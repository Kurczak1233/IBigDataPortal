using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IBigDataPortal.Database.Migrations
{
    public partial class AddPermissionsToPosts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProhibitedCommenting",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "ProhibitedCommenting",
                table: "JobOffers");

            migrationBuilder.DropColumn(
                name: "ProhibitedCommenting",
                table: "EduLinks");

            migrationBuilder.AddColumn<int>(
                name: "ArticleVisibilityPermissions",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CommentsPermissions",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ArticleVisibilityPermissions",
                table: "JobOffers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CommentsPermissions",
                table: "JobOffers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ArticleVisibilityPermissions",
                table: "EduLinks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CommentsPermissions",
                table: "EduLinks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArticleVisibilityPermissions",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "CommentsPermissions",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "ArticleVisibilityPermissions",
                table: "JobOffers");

            migrationBuilder.DropColumn(
                name: "CommentsPermissions",
                table: "JobOffers");

            migrationBuilder.DropColumn(
                name: "ArticleVisibilityPermissions",
                table: "EduLinks");

            migrationBuilder.DropColumn(
                name: "CommentsPermissions",
                table: "EduLinks");

            migrationBuilder.AddColumn<bool>(
                name: "ProhibitedCommenting",
                table: "Posts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ProhibitedCommenting",
                table: "JobOffers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ProhibitedCommenting",
                table: "EduLinks",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

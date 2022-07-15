using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IBigDataPortal.Database.Migrations
{
    public partial class UpdateCommentsRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_EduLinks_EduLinkId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Comment_JobOffers_JobOfferId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Posts_PostId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Users_CreatorId",
                table: "Comment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Comment",
                table: "Comment");

            migrationBuilder.DropIndex(
                name: "IX_Comment_EduLinkId",
                table: "Comment");

            migrationBuilder.DropIndex(
                name: "IX_Comment_JobOfferId",
                table: "Comment");

            migrationBuilder.DropIndex(
                name: "IX_Comment_PostId",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "EduLinkId",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "JobOfferId",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Comment");

            migrationBuilder.RenameTable(
                name: "Comment",
                newName: "Comments");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_CreatorId",
                table: "Comments",
                newName: "IX_Comments_CreatorId");

            migrationBuilder.AddColumn<int>(
                name: "ArticleId",
                table: "Comments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ArticleType",
                table: "Comments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comments",
                table: "Comments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_CreatorId",
                table: "Comments",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_CreatorId",
                table: "Comments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Comments",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "ArticleId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "ArticleType",
                table: "Comments");

            migrationBuilder.RenameTable(
                name: "Comments",
                newName: "Comment");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_CreatorId",
                table: "Comment",
                newName: "IX_Comment_CreatorId");

            migrationBuilder.AddColumn<int>(
                name: "EduLinkId",
                table: "Comment",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "JobOfferId",
                table: "Comment",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Comment",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comment",
                table: "Comment",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_EduLinkId",
                table: "Comment",
                column: "EduLinkId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_JobOfferId",
                table: "Comment",
                column: "JobOfferId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_PostId",
                table: "Comment",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_EduLinks_EduLinkId",
                table: "Comment",
                column: "EduLinkId",
                principalTable: "EduLinks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_JobOffers_JobOfferId",
                table: "Comment",
                column: "JobOfferId",
                principalTable: "JobOffers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Posts_PostId",
                table: "Comment",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Users_CreatorId",
                table: "Comment",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

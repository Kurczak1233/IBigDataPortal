using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IBigDataPortal.Database.Migrations
{
    public partial class UpdateCooperations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Cooperations");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Cooperations",
                newName: "RequestTopic");

            migrationBuilder.AddColumn<int>(
                name: "CreatorId",
                table: "Cooperations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Cooperations_CreatorId",
                table: "Cooperations",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cooperations_Users_CreatorId",
                table: "Cooperations",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cooperations_Users_CreatorId",
                table: "Cooperations");

            migrationBuilder.DropIndex(
                name: "IX_Cooperations_CreatorId",
                table: "Cooperations");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Cooperations");

            migrationBuilder.RenameColumn(
                name: "RequestTopic",
                table: "Cooperations",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Cooperations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}

﻿using Files.Contracts.ViewModels;
using IBigDataPortal.Database.Entities;
using UserRole.Contracts.UserRoles;

namespace Posts.Contracts.ViewModels;

public class PostViewModel
{
    public int Id { get; set; }
    public int CreatorId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string UserEmail { get; set; }
    public string Type { get; set; }
    public string Nickname { get; set; }
    public UserRoles CommentsPermissions { get; set; }
    public UserRoles ArticleVisibilityPermissions { get; set; }

    public DateTimeOffset Posted { get; set; }
    public List<FileVm?> Files { get; set; } = new();
    public List<PostCommentViewModel> Comments { get; set; } = new();

}
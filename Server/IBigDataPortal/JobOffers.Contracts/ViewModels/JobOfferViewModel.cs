﻿using Files.Contracts.ViewModels;
using UserRole.Contracts.UserRoles;

namespace JobOffers.Contracts.ViewModels;

public class JobOfferViewModel
{
    public int Id { get; set; }
    public int CreatorId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string UserEmail { get; set; }
    public string Nickname { get; set; }
    public string Type { get; set; }
    public UserRoles CommentsPermissions { get; set; }
    public UserRoles ArticleVisibilityPermissions { get; set; }
    public DateTimeOffset Posted { get; set; } 
    public List<FileVm?> Files { get; set; } = new();
    public List<JobOfferCommentViewModel> Comments { get; set; } = new();
}
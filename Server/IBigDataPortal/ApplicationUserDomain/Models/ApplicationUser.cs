﻿using UserRole.Contracts.UserRoles;

namespace ApplicationUserDomain.Models;

public class ApplicationUserDto
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Nickname { get; set; }
    public int UserRoleId { get; set; }
    public Guid ProfilePictureGuid { get; set; }
}
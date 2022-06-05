﻿namespace Posts.Domain.PostsAggregate.Requests;

public class UpdatePostRequest
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
}
using MediatR;
using Microsoft.Spatial;

namespace MobileApiOuterProject.Application.Queries;

public class GetCoordinatesQuery : IRequest<List<CoordinatesVm>>
{
}

public class GetCoordinatesQueryHandler : IRequestHandler<GetCoordinatesQuery, List<CoordinatesVm>>
{
    public GetCoordinatesQueryHandler()
    {
    }

    public async Task<List<CoordinatesVm>> Handle(GetCoordinatesQuery request, CancellationToken cancellationToken)
    {
        var gp1 = GeographyPoint.Create(49.783572, 19.058950); //ATH budynek B
        var gp2 = GeographyPoint.Create(49.783243, 19.058477); //ATH budynek A
        var gp3 = GeographyPoint.Create(49.783371, 19.057839); //ATH budynek pod l wejście

        return new List<CoordinatesVm>()
        {
            new()
            {
                Id = 1, Question = "This is some question", Answer = "This is some answer", Geolocation = gp1,
                LocatlizationName = "ATH budynek B centrum"
            },
            new()
            {
                Id = 2,
                Question = "This is some question 2",
                Answer = "This is some answer 2",
                Geolocation = gp2, LocatlizationName = "ATH budynek A centrum"
            },
            new()
            {
                Id = 3,
                Question = "This is some question 3",
                Answer = "This is some answer 3",
                Geolocation = gp3, LocatlizationName = "ATH budynek L wejście"
            },
        };
    }
}
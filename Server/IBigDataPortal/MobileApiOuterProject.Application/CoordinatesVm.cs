using Microsoft.Spatial;

namespace MobileApiOuterProject.Application;

public class CoordinatesVm
{
    public int Id { get; set; }
    public string Question { get; set; }
    public string Answer { get; set; }
    public string LocatlizationName { get; set; }
    public GeographyPoint Geolocation { get; set; }
}
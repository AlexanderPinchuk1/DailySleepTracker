using AutoMapper;
using DailySleepTracker.Domain.Models;
using DailySleepTracker.Server.ViewModels;

namespace DailySleepTracker.Server.MappingProfiles
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<LoginViewModel, User>();
            CreateMap<RegisterViewModel, User>();
        }
    }
}

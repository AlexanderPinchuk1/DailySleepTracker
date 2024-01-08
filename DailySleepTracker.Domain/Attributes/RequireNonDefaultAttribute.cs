using System.ComponentModel.DataAnnotations;

namespace DailySleepTracker.Domain.Attributes
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
    public class RequireNonDefaultAttribute : ValidationAttribute
    {
        public RequireNonDefaultAttribute()
            : base()
        {
        }



        public override bool IsValid(object? value)
        {
            if (value is null)
            {
                return true;
            }

            var type = value.GetType();

            return !Equals(value, Activator.CreateInstance(Nullable.GetUnderlyingType(type) ?? type));
        }
    }
}

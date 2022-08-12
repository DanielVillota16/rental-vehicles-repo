using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace RentalVehicles.Security
{
    public class TokenManager
    {
        public static string CreateToken(string username, string internalToken)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Name, username)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(internalToken));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}

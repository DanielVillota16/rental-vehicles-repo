using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RentalVehicles.Data.Base;
using RentalVehicles.Data.Repositories;
using RentalVehicles.Models.Dtos;
using RentalVehicles.Models.Entities;
using RentalVehicles.Security;

namespace RentalVehicles.Controllers.Base
{
    public abstract class UserController<TUser> : CustomControllerBase<TUser>
        where TUser : User, new()
    {

        private readonly string getUserRouteName;
        private readonly IConfiguration _configuration;

        protected UserController(IRepository<TUser> repository, IMapper mapper, string getUserRouteName, IConfiguration configuration) 
            : base(repository, mapper) {
            this.getUserRouteName = getUserRouteName;
            this._configuration = configuration;
        }

        [HttpGet("{username}/id")]
        public ActionResult<int> GetIdByUsername(string username)
        {
            int? id = ((UserRepository<TUser>)repository).GetUserByUsername(username)?.Id;
            return id;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] CreateUserDto createUserDto)
        {
            createUserDto.PasswordHash = PasswordManager.Hash(createUserDto.PasswordHash);
            var ans = await Post<CreateUserDto, UserDto>(createUserDto, getUserRouteName);
            return ans;
        }

        [HttpPost("login")]
        public ActionResult<string> Login([FromBody] UserLoginDto userLoginDto)
        {
            var user = ((UserRepository<TUser>)repository).GetUserByUsername(userLoginDto.Username);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            if (!PasswordManager.VerifyPasswords(user.PasswordHash, userLoginDto.Password))
            {
                return BadRequest("Incorrect password");
            }
            string internalToken = _configuration.GetSection("AppSettings:Token").Value;
            string token = TokenManager.CreateToken(user.Username, internalToken);
            return Ok(token);
        }
    }
}

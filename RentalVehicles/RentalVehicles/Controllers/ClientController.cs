﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentalVehicles.Controllers.Base;
using RentalVehicles.Data.Repositories;
using RentalVehicles.Models.Dtos;
using RentalVehicles.Models.Entities;
using RentalVehicles.Security;

namespace RentalVehicles.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : UserController<Client>
    {
        private const string getClientRouteName = "getClient";
        
        public ClientController(IClientRepository repository, IMapper mapper, IConfiguration configuration) 
            : base(repository, mapper, getClientRouteName, configuration) { }

        [HttpGet]
        public async Task<ActionResult<List<ClientDto>>> Get()
        {
            return await Get<ClientDto>();
        }

        [HttpGet("{id:int}", Name = getClientRouteName)]
        public async Task<ActionResult<ClientDto>> Get(int id)
        {
            return await Get<ClientDto>(id);
        }

        [HttpPost]
        public async Task<ActionResult<ClientDto>> Post([FromBody] CreateClientDto createClientDto)
        {
            createClientDto.PasswordHash = PasswordManager.Hash(createClientDto.PasswordHash);
            return await Post<CreateClientDto, ClientDto>(createClientDto, getClientRouteName);
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] UpdateClientDto updateClientDto)
        {
            return await Put<UpdateClientDto>(updateClientDto);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            return await base.Delete(id);
        }

        [HttpGet("requests/{username}"), Authorize]
        public ActionResult<List<RequestDto>> GetRequestsMade(string username)
        {
            var res = ((ClientRepository)repository).GetRequestsMade(username);
            return base.mapper.Map<List<RequestDto>>(res);
        }

    }
}

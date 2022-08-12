using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RentalVehicles.Data.Base;
using RentalVehicles.Models.Base;

namespace RentalVehicles.Controllers.Base
{
    public abstract class CustomControllerBase<TEntity> : ControllerBase
        where TEntity : class, IHasId, new()
    {
        protected readonly IRepository<TEntity> repository;
        protected readonly IMapper mapper;

        public CustomControllerBase(IRepository<TEntity> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        protected async Task<List<TEntityDto>> Get<TEntityDto>()
        {
            var entityList = await repository.GetAllAsync();
            var dtos = mapper.Map<List<TEntityDto>>(entityList);
            return dtos;
        }

        protected async Task<ActionResult<TEntityDto>> Get<TEntityDto>(int id)
        {
            var entity = await repository.GetByIdAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            return mapper.Map<TEntityDto>(entity);
        }

        protected async Task<ActionResult<TEntityDto>> Post<TCreationDto, TEntityDto>
            (TCreationDto creationDto, string getEntityRouteName)
        {
            var entity = mapper.Map<TEntity>(creationDto);
            await repository.AddAsync(entity);
            var responseDto = mapper.Map<TEntityDto>(entity);

            return new CreatedAtRouteResult(getEntityRouteName, new { id = entity.Id }, responseDto);
        }

        protected async Task<ActionResult> Put<TUpdateDto>
            (TUpdateDto updateDto) where TUpdateDto : class, IHasId
        {
            var exists = await repository.ExistsAsync(t => t.Id == updateDto.Id);

            if (!exists)
            {
                return NotFound();
            }

            var entityToUpdate = await repository.GetByIdAsync(updateDto.Id);

            entityToUpdate = mapper.Map(updateDto, entityToUpdate);

            await repository.UpdateAsync(entityToUpdate);

            return NoContent();
        }

        protected async Task<ActionResult> Delete(int id)
        {
            var exists = await repository.ExistsAsync(t => t.Id == id);

            if (!exists)
            {
                return NotFound();
            }

            await repository.DeleteAsync(new TEntity() { Id = id });

            return NoContent();
        }
    }
}

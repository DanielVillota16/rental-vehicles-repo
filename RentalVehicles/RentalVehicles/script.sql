CREATE TABLE [Admins] (
    [Id] int NOT NULL IDENTITY,
    [FullName] nvarchar(80) NOT NULL,
    [LegalIdNumber] nvarchar(20) NOT NULL,
    [Username] nvarchar(20) NOT NULL,
    [PasswordHash] nvarchar(80) NOT NULL,
    [PhoneNumber] nvarchar(30) NULL,
    [Email] nvarchar(80) NULL,
    CONSTRAINT [PK_Admins] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Clients] (
    [Id] int NOT NULL IDENTITY,
    [FullName] nvarchar(80) NOT NULL,
    [LegalIdNumber] nvarchar(20) NOT NULL,
    [Username] nvarchar(20) NOT NULL,
    [PasswordHash] nvarchar(80) NOT NULL,
    [PhoneNumber] nvarchar(30) NULL,
    [Email] nvarchar(80) NULL,
    CONSTRAINT [PK_Clients] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Vehicles] (
    [Id] int NOT NULL IDENTITY,
    [Plate] nvarchar(max) NOT NULL,
    [Type] nvarchar(max) NOT NULL,
    [Model] nvarchar(max) NOT NULL,
    [Status] int NOT NULL,
    [PricePerHour] money NOT NULL,
    [PricePerDay] money NOT NULL,
    [OwnerId] int NOT NULL,
    CONSTRAINT [PK_Vehicles] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Vehicles_Admins_OwnerId] FOREIGN KEY ([OwnerId]) REFERENCES [Admins] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [Requests] (
    [Id] int NOT NULL IDENTITY,
    [Status] int NOT NULL,
    [HoursOfRent] int NOT NULL,
    [DaysOfRent] int NOT NULL,
    [VehicleId] int NOT NULL,
    [ClientId] int NOT NULL,
    CONSTRAINT [PK_Requests] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Requests_Clients_ClientId] FOREIGN KEY ([ClientId]) REFERENCES [Clients] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Requests_Vehicles_VehicleId] FOREIGN KEY ([VehicleId]) REFERENCES [Vehicles] ([Id]) ON DELETE CASCADE
);
GO


CREATE UNIQUE INDEX [IX_Admins_Username] ON [Admins] ([Username]);
GO


CREATE UNIQUE INDEX [IX_Clients_Username] ON [Clients] ([Username]);
GO


CREATE INDEX [IX_Requests_ClientId] ON [Requests] ([ClientId]);
GO


CREATE INDEX [IX_Requests_VehicleId] ON [Requests] ([VehicleId]);
GO


CREATE INDEX [IX_Vehicles_OwnerId] ON [Vehicles] ([OwnerId]);
GO



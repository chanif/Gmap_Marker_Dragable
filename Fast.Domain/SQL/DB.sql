USE [FAST]
GO
/****** Object:  Table [dbo].[Locations]    Script Date: 05/09/2019 05:03:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Locations](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ParentID] [int] NULL,
	[Name] [nvarchar](250) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_Regions] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Modules]    Script Date: 05/09/2019 05:03:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Modules](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ParentID] [int] NULL,
	[DisplayOrder] [int] NOT NULL,
	[Name] [nvarchar](512) NULL,
	[PageIcon] [nvarchar](50) NULL,
	[PageSlug] [nvarchar](512) NULL,
	[PageController] [nvarchar](50) NULL,
	[PageAction] [nvarchar](50) NULL,
	[IsActive] [bit] NOT NULL,
	[IsParent] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_Modules] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RoleModules]    Script Date: 05/09/2019 05:03:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleModules](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[RoleID] [int] NOT NULL,
	[ModuleID] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_UserPermissions] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 05/09/2019 05:03:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[DisplayName] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](512) NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserLogs]    Script Date: 05/09/2019 05:03:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserLogs](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NULL,
	[Module] [nvarchar](150) NULL,
	[Message] [nvarchar](1024) NOT NULL,
	[LogTime] [datetime] NOT NULL,
	[IPAddress] [nvarchar](50) NOT NULL,
	[MoreInfo] [nvarchar](1024) NOT NULL,
	[IsError] [bit] NOT NULL,
 CONSTRAINT [PK_UserLogs] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 05/09/2019 05:03:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[RoleID] [int] NOT NULL,
	[LocationID] [int] NULL,
	[FirstName] [nvarchar](150) NOT NULL,
	[LastName] [nvarchar](150) NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](512) NOT NULL,
	[BirthDate] [datetime] NULL,
	[Phone] [nvarchar](50) NULL,
	[Address] [nvarchar](512) NULL,
	[PhotoPath] [nvarchar](512) NULL,
	[Email] [nvarchar](512) NULL,
	[Status] [nvarchar](50) NULL,
	[LastLoginDate] [datetime] NULL,
	[LastLockoutDate] [datetime] NULL,
	[FailedPasswordCount] [int] NULL,
	[Token] [nvarchar](255) NULL,
	[IsPending] [bit] NULL,
	[IsLocked] [bit] NOT NULL,
	[IsApproved] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Locations] ON 
GO
INSERT [dbo].[Locations] ([ID], [ParentID], [Name], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, NULL, N'DKI Jakarta', 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Locations] ([ID], [ParentID], [Name], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, NULL, N'Jawa Timur', 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Locations] ([ID], [ParentID], [Name], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, NULL, N'Jawa Barat', 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Locations] ([ID], [ParentID], [Name], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, NULL, N'Jawa Tengah', 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Locations] ([ID], [ParentID], [Name], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, NULL, N'DI Yogyakarta', 0, N'admin', CAST(N'2019-08-31T08:43:54.357' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Locations] ([ID], [ParentID], [Name], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (7, NULL, N'Aceh', 0, N'admin', CAST(N'2019-09-01T04:06:03.097' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Locations] ([ID], [ParentID], [Name], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, NULL, N'Bali', 0, N'admin', CAST(N'2019-09-01T04:15:59.373' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Locations] ([ID], [ParentID], [Name], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, NULL, N'Banten', 0, N'admin', CAST(N'2019-09-01T04:18:07.470' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Locations] ([ID], [ParentID], [Name], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, NULL, N'Maluku', 0, N'admin', CAST(N'2019-09-01T08:29:37.833' AS DateTime), NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Locations] OFF
GO
SET IDENTITY_INSERT [dbo].[Modules] ON 
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, NULL, 2, N'User Management', N'fa-users', N'usermanagement', N'User', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, NULL, 3, N'Role & Permissions', N'fa-user', N'lirolepermissions', N'RolePermission', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, NULL, 8, N'Reporting', N'fa-file-text-o', N'lireporting', NULL, NULL, 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, NULL, 5, N'Master Media Management', N'fa-image', N'limastermanagement', N'MasterMedia', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, NULL, 1, N'Dashboard', N'fa-dashboard', N'lidashboard', N'Home', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, NULL, 6, N'Master 3D Management', N'fa-cube', N'limastermanagement3d', NULL, NULL, 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (7, NULL, 1, N'3D Category', N'', N'limastermanagement3d_kategori', N'Kategori', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, NULL, 2, N'Master 3D', N'', N'limastermanagement3d_3d', N'Master3D', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, NULL, 3, N'Gallery 3D', N'', N'limastermanagement3d_child', N'Child3D', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, NULL, 7, N'Master PDF Management', N'fa-file-pdf-o', N'limastermanagementPDF', NULL, NULL, 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (11, NULL, 1, N'Master PDF', N'', N'limastermanagementPDF_kategori', N'MasterPDF', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (12, NULL, 2, N'PDF Category', N'', N'limastermanagementPDF_pdf', N'CategoryPDF', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (13, NULL, 1, N'Reporting Screenshoot', N'', N'lireporting_screenshoot', N'Reporting', N'Screenshoot', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (14, NULL, 2, N'Reporting Project', N'', N'lireporting_project', N'Reporting', N'Project', 0, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (15, NULL, 3, N'Reporting Project', N'', N'lireporting_perlengkapan', N'Reporting', N'Perlengkapan', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (16, NULL, 3, N'Master PDF Page', N'', N'limastermanagementPDF_halaman', N'MasterPDFPage', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (17, NULL, 4, N'Module Management', N'fa-cog', N'limodulemanagement', N'Module', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (18, NULL, 5, N'Region Management', N'fa-map-marker', N'liregionmanagement', N'Region', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (19, NULL, 1, N'User Logs', N'fa-user', N'liuserlogsmanagement', N'UserLogs', N'Index', 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Modules] ([ID], [ParentID], [DisplayOrder], [Name], [PageIcon], [PageSlug], [PageController], [PageAction], [IsActive], [IsParent], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (20, NULL, 1, N'Test Module', N'fa-user', N'testmodule', N'TestModule', N'Index', 1, 1, 0, N'admin', CAST(N'2019-08-27T21:54:13.880' AS DateTime), NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Modules] OFF
GO
SET IDENTITY_INSERT [dbo].[RoleModules] ON 
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, 1, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, 1, 2, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, 1, 3, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, 1, 4, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, 1, 5, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, 1, 6, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (7, 1, 7, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, 1, 8, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, 1, 9, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, 1, 10, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (11, 1, 11, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (12, 1, 12, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (13, 1, 13, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (14, 1, 14, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (15, 1, 19, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (16, 1, 20, 1, NULL, NULL, N'admin', CAST(N'2019-08-31T00:41:40.540' AS DateTime))
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (17, 3, 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (18, 3, 2, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (19, 1, 18, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (20, 1, 15, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (21, 1, 16, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[RoleModules] ([ID], [RoleID], [ModuleID], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (22, 1, 17, 0, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[RoleModules] OFF
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 
GO
INSERT [dbo].[Roles] ([ID], [Name], [DisplayName], [Description], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, N'admin', N'Admin TI', N'Admin TI', 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Roles] ([ID], [Name], [DisplayName], [Description], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, N'adminKP', N'Admin Kantor Pusat', N'Admin Kantor Pusat', 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Roles] ([ID], [Name], [DisplayName], [Description], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, N'supervisor', N'Supervisor', N'Supervisor', 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Roles] ([ID], [Name], [DisplayName], [Description], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, N'sales', N'Sales', N'Sales', 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Roles] ([ID], [Name], [DisplayName], [Description], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, N'tester', N'Tester TI', N'Melakukan tes pada sistem ITS', 1, NULL, NULL, N'admin', CAST(N'2019-08-30T05:01:20.277' AS DateTime))
GO
INSERT [dbo].[Roles] ([ID], [Name], [DisplayName], [Description], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, N'tester1', N'Tester TIK', N'Melakukan tes pada sistem IT', 1, N'admin', CAST(N'2019-08-31T03:28:45.040' AS DateTime), N'admin', CAST(N'2019-08-31T03:33:22.047' AS DateTime))
GO
INSERT [dbo].[Roles] ([ID], [Name], [DisplayName], [Description], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, N'tester2', N'Tester TI', N'Melakukan tes pada sistem IT', 1, N'admin', CAST(N'2019-08-31T03:41:41.200' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Roles] ([ID], [Name], [DisplayName], [Description], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, N'QA', N'Tester TI', N'Melakukan tes pada sistem IT', 0, N'admin', CAST(N'2019-09-01T08:30:54.610' AS DateTime), NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 
GO
INSERT [dbo].[Users] ([ID], [RoleID], [LocationID], [FirstName], [LastName], [UserName], [Password], [BirthDate], [Phone], [Address], [PhotoPath], [Email], [Status], [LastLoginDate], [LastLockoutDate], [FailedPasswordCount], [Token], [IsPending], [IsLocked], [IsApproved], [IsDeleted], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, 1, 2, N'Admin', N'Sampoerna', N'admin', N'I8Mrkk8MYBC3NsmT689VuIQwJUdbMZp9C7VQmtR5Sro=', NULL, N'0898989898', N'Jl Mawar Berduri 6673', NULL, NULL, N'Active', CAST(N'2019-09-05T04:00:53.877' AS DateTime), CAST(N'2018-10-02T16:08:42.040' AS DateTime), 0, NULL, 0, 0, 0, 0, NULL, NULL, N'admin', CAST(N'2019-08-31T02:44:15.413' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[Locations] ADD  CONSTRAINT [DF_Regions_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Modules] ADD  CONSTRAINT [DF_Modules_IsDeleted_1]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[RoleModules] ADD  CONSTRAINT [DF_UserPermissions_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Roles] ADD  CONSTRAINT [DF_Roles_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_IsDeleted_1]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[RoleModules]  WITH CHECK ADD  CONSTRAINT [FK_RoleModules_Modules] FOREIGN KEY([ModuleID])
REFERENCES [dbo].[Modules] ([ID])
GO
ALTER TABLE [dbo].[RoleModules] CHECK CONSTRAINT [FK_RoleModules_Modules]
GO
ALTER TABLE [dbo].[RoleModules]  WITH CHECK ADD  CONSTRAINT [FK_RoleModules_Roles] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([ID])
GO
ALTER TABLE [dbo].[RoleModules] CHECK CONSTRAINT [FK_RoleModules_Roles]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Locations] FOREIGN KEY([LocationID])
REFERENCES [dbo].[Locations] ([ID])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Locations]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Roles] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([ID])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Roles]
GO

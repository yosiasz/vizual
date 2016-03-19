USE [vizual]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[books]') AND type in (N'U'))
begin
DROP TABLE [dbo].[books]
end

CREATE TABLE [dbo].[books](
	[bookid] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](50) NOT NULL,
	[genre] [nvarchar](50) NOT NULL,
	[author] [nvarchar](100) NOT NULL,
	[readFlag] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[bookid] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

insert into books
select 'Desert Fox',
       'Fiction',
       'Hamdeen Sharaaz',
       1
union       
select 'War and Peace',
       'Historial Fiction',
       'Lev Lenin',
       0
union       
select 'sdsdsds and Peace',
       'Historial Fiction',
       'Lev Lenin',
       0
       


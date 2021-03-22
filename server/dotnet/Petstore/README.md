# things
1. generate controller command
```text
dotnet aspnet-codegenerator controller -name UserController -async -api -m User -dc PetstoreContext -outDir Controllers
```
[generate controller error](https://github.com/dotnet/efcore/issues/12604)

2. [Use Entity Framework Core 5.0 In .NET Core 3.1 With MySQL Database By Code-First Migration On Visual Studio 2019 For RESTful API Application](https://www.c-sharpcorner.com/article/tutorial-use-entity-framework-core-5-0-in-net-core-3-1-with-mysql-database-by2/)
3. start step
    1. install package
      ```xml
      <Project Sdk="Microsoft.NET.Sdk.Web">

        <PropertyGroup>
          <TargetFramework>net5.0</TargetFramework>
        </PropertyGroup>
      
        <ItemGroup>
          <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="5.0.4">
            <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
            <PrivateAssets>all</PrivateAssets>
          </PackageReference>
          <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="5.0.4" />
          <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="5.0.2" />
          <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="5.0.0-alpha.2" />
          <PackageReference Include="Swashbuckle.AspNetCore" Version="5.6.3" />
        </ItemGroup>
      
      </Project>
      ```
   2. install cli tool
   ```bash
     # orm cli
     dotnet tool install --global dotnet-ef
   ```
   3. command
   ```bash
     # create dbcontext
     dotnet ef dbcontext scaffold "Server=localhost;Database=ef;User=root;Password=123456;TreatTinyAsBoolean=true;" "Pomelo.EntityFrameworkCore.MySql" -c PetstoreContext --context-dir Models
     # generate one controller
     dotnet aspnet-codegenerator controller -name UserController -async -api -m User -dc PetstoreContext -outDir Controllers
   ```
        
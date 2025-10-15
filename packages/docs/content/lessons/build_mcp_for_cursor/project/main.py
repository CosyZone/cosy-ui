from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("about-me")

@mcp.tool()
async def get_user_name() -> str:
    """Get the user's name.
    """
    return "Lucas Lee"

@mcp.tool()
async def get_user_age() -> int:
    """Get the user's age.
    """
    return 30

@mcp.tool()
async def get_user_location() -> str:
    """Get the user's location.
    """
    return "San Francisco, CA"

@mcp.tool()
async def get_user_interests() -> list[str]:
    """Get the user's interests.
    """
    return ["travel", "food", "technology"]

if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport='stdio')
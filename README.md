# GameZone API Documentation

A comprehensive API for managing game categories, leaderboards, and game details.

## Base URL
```
https://gamezone-backend.onrender.com/api
```

## API Endpoints

### Games by Category
All category endpoints support preview mode and similar games recommendations.

#### Racing Games
- `GET /racing` - Get all racing games
- `GET /racing?preview=true` - Get preview list of racing games
- `GET /racing/:gameId` - Get specific racing game (automatically increments play count)
- `POST /racing/:gameId/download` - Track game download

#### Action Games
- `GET /action` - Get all action games
- `GET /action?preview=true` - Get preview list of action games
- `GET /action/:gameId` - Get specific action game (automatically increments play count)
- `POST /action/:gameId/download` - Track game download

#### Puzzle Games
- `GET /puzzle` - Get all puzzle games
- `GET /puzzle?preview=true` - Get preview list of puzzle games
- `GET /puzzle/:gameId` - Get specific puzzle game (automatically increments play count)
- `POST /puzzle/:gameId/download` - Track game download

#### Sports Games
- `GET /sports` - Get all sports games
- `GET /sports?preview=true` - Get preview list of sports games
- `GET /sports/:gameId` - Get specific sports game (automatically increments play count)
- `POST /sports/:gameId/download` - Track game download

#### Strategy Games
- `GET /strategy` - Get all strategy games
- `GET /strategy?preview=true` - Get preview list of strategy games
- `GET /strategy/:gameId` - Get specific strategy game (automatically increments play count)
- `POST /strategy/:gameId/download` - Track game download

#### Adventure Games
- `GET /adventure` - Get all adventure games
- `GET /adventure?preview=true` - Get preview list of adventure games
- `GET /adventure/:gameId` - Get specific adventure game (automatically increments play count)
- `POST /adventure/:gameId/download` - Track game download

### Search
- `GET /search/global?q=searchTerm` - Search across all categories
- `GET /search/category/:category?q=searchTerm` - Search within specific category

### Leaderboard
- `GET /leaderboard/overall` - Get overall leaderboard
- `GET /leaderboard/game/:gameId` - Get game-specific leaderboard
- `PUT /leaderboard/update` - Update player score

## Response Formats

### Game Preview Response
```json
{
  "name": "Game Name",
  "photos": {
    "thumbnail": "thumbnail_url"
  },
  "rating": {
    "average": 4.5,
    "count": 100
  },
  "difficulty": "Medium",
  "platforms": ["Web", "Mobile"],
  "downloadCount": 1000,
  "playCount": 500
}
```

### Full Game Response
```json
{
  "game": {
    "gameId": "001",
    "name": "Game Name",
    "category": "Racing",
    "description": "Game description",
    "photos": {
      "thumbnail": "url",
      "banner": "url",
      "screenshots": ["url1", "url2"]
    },
    "rating": {
      "average": 4.5,
      "count": 100
    },
    "developer": "Developer Name",
    "technology": "WebGL",
    "platforms": ["Web", "Mobile"],
    "classification": "E for Everyone",
    "releaseDate": "2023-12-20T00:00:00.000Z",
    "size": "25MB",
    "downloadCount": 1000,
    "playCount": 500,
    "difficulty": "Medium",
    "features": ["feature1", "feature2"],
    "controls": {
      "key": "action"
    },
    "achievements": [{
      "name": "Achievement",
      "description": "Description",
      "points": 100
    }]
  },
  "similarGames": [
    {
      "name": "Similar Game",
      "photos": {
        "thumbnail": "url"
      },
      "rating": {
        "average": 4.0
      }
    }
  ]
}
```

### Leaderboard Response
```json
{
  "userId": "user123",
  "username": "Player1",
  "score": 1000,
  "gamesPlayed": 10,
  "totalScore": 5000
}
```

## Error Responses
```json
{
  "message": "Error message description"
}
```

## Status Codes
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Server Error

## Game Statistics
Each game tracks the following statistics:
- `downloadCount`: Number of times the game has been downloaded
- `playCount`: Number of times the game has been opened/played
- `rating`: Average rating and total number of ratings
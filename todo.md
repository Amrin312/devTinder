
# DevTinder APIS

## authRouter
- POST /signup  -- done
- POST /login   -- done
- POST /Logout  -- done

## profileRouter
GET /profile/view  -- done
PATCH /profile/edit  -- done
PATCH /profile/password // Forgot password API --- done 

## connectionRequestRouter
- POST /request/send/intereted/:userId
- POST /request/send/ignored/: userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## user Router
- GET /user/connections  --- done
- GET /user/requests   --- done
- GET /user/feed - Gets you the profiles of other  

Status: ignore, interested, accepeted, rejected
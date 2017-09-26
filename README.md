# Folder Browser

### Installation
  1. Clone the repo to your driver
  2. Open up a terminal in the root folder of the project and type

          cd server

          npm install

          cd ../client

          npm install

### Running the program
  1. Open two terminals in the root of the project

  2. In the first one type

          cd server

          npm run dev

  3. In the other one type

          cd client

          npm start

### Configuration

  To change the folder in use change the path in server/src/lib/config.js
  This approach is chosen because it felt really unsafe to let the client freely move around in the folders on the server


### Practical use

  The page shows the desalinated root folder, and if you click the open button you see the files and folders in that folders and then it's the same for every folder

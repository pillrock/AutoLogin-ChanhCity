import Button from '@mui/material/Button';
import PathSelector from './components/PathSelector';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PositionButtonJoin from './components/PositionButtonJoin';
import UpdateApp from './components/UpdateApp';
import { useEffect, useState } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
interface UpdateInfo {
  releaseName: string;
  releaseNotes: string;
  releaseDate: string;
  updateURL: string;
}
function App() {
  const [isUpdate, setIsUpdate] = React.useState(true);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  useEffect(() => {
    // Lắng nghe sự kiện 'update_available'
    window.electronAPI.onUpdateAvailable((event: any, info: UpdateInfo) => {
      console.log('update_available', info);
      // setUpdateMessage(message);
    });

    // Lắng nghe sự kiện 'update_downloaded'
    window.electronAPI.onUpdateDownloaded((message: string) => {
      setUpdateMessage(message);
    });
  }, []);
  console.log('updateMessage', updateMessage);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="">
      {isUpdate && <UpdateApp setIsUpdate={setIsUpdate} />}
      <header>
        <div className="flex items-center justify-end p-4">
          <Button variant="contained" onClick={handleOpen} color="primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </Button>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style} className="rounded-xl border-none outline-none">
              <PositionButtonJoin />
            </Box>
          </Modal>
        </div>
      </header>
      <section>
        <PathSelector />
      </section>
    </div>
  );
}

export default App;

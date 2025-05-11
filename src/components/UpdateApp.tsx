import { Box, Modal } from '@mui/material';
import Button from './Button';
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

export default function UpdateApp({ setIsUpdate }: { setIsUpdate: (value: boolean) => void }) {
  return (
    <div>
      <Modal
        keepMounted
        open={true}
        onClose={() => setIsUpdate(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} className="rounded-xl border-none outline-none">
          <h1 className="text-xl">
            Một bản cập nhật mới đã sẵn sàng. Bạn có muốn cập nhật ngay bây giờ không?
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Button
              className="border-[1px] border-gray-300 bg-white text-gray-500"
              onClick={() => {
                setIsUpdate(false);
                // Logic to skip the update
              }}
            >
              Để sau
            </Button>
            <Button
              className="bg-blue-500 text-white"
              onClick={() => {
                setIsUpdate(false);
                // Logic to update the app
              }}
            >
              Cập nhật ngay
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

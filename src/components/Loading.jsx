import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Loading() {
  return (
    <Stack spacing={1} sx={{display:'flex', flexDirection:'column', gap:'10px', justifyContent:'center', alignItems:'center'}}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '2rem', bgcolor:'ActiveCaption', p:1, color:'#fff' }}>Loading...</Skeleton>
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={60} height={60} sx={{bgcolor:'#27292b'}}/>
      <Skeleton variant="rectangular" animation="wave"  width='80%' height={200} sx={{bgcolor:'#27292b'}}/>
      <Skeleton variant="rectangular" width='80%' height={40} sx={{bgcolor:'#27292b'}}/>
      <Skeleton variant="rounded" width='80%' height={200} sx={{bgcolor:'#27292b'}}/>
    </Stack>
  );
}

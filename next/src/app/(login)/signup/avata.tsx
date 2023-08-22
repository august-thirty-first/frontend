'use client';

import { useShowModal } from '@/app/ShowModalContext';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface avataProps {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

const Avata = ({ file, setFile }: avataProps) => {
  const alertModal = useShowModal();
  const onHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxFileSize = 1024 * 1024 * 1;
    const files = event.target.files;
    if (files && files[0]) {
      const cur_file = files[0];
      if (cur_file.size >= maxFileSize) {
        alertModal('파일 크기는 1MB까지만 가능합니다.');
        event.target.value = '';
        setFile(null);
      } else setFile(files[0]);
    }
  };
  return (
    <div>
      <label htmlFor="avata_path">아바타 사진</label>
      <br />
      <input
        type="file"
        onChange={onHandler}
        name="avata_path"
        id="avata_path"
        accept="image/png, image/jpeg, image/jpg"
      />
    </div>
  );
};

export default Avata;

import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useContext,
  useState,
} from 'react';
import { GlobalDispatchContext } from 'context';
import {
  setActiveWeather,
  renameLocation,
  setMessage,
  deleteLocation,
} from 'context/actions';
import { LocationInfo } from 'forecast';
import { Link } from 'gatsby';
import { BiEdit } from 'react-icons/bi';
import Modal from 'react-modal';
import { MdDeleteForever } from 'react-icons/md';

type Props = {
  location: LocationInfo;
};
const SavedLocation = ({ location }: Props) => {
  // Bind modal to root element (for accessibility)
  Modal.setAppElement('#___gatsby');

  const dispatch = useContext(GlobalDispatchContext);

  // Local state
  const [renameModalOpenState, setRenameModalOpenState] = useState(false);
  const [deleteModalOpenState, setDeleteModalOpenState] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setNewLocationName(e.target.value);
  };

  const onRenameButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (newLocationName.trim().length) {
      // Rename
      dispatch(
        renameLocation({
          lat: location.lat,
          lng: location.lon,
          newName: newLocationName,
        })
      );
      // Close modal
      setRenameModalOpenState(false);
    } else {
      // Notify user the new name needs to be at least 1 char in length
      dispatch(
        setMessage({
          type: 'error',
          text: 'Please type in at least 1 character',
        })
      );
    }
  };

  const onDeleteButtonClick = () => {
    dispatch(
      deleteLocation({
        lat: location.lat,
        lng: location.lon,
      })
    );
    setDeleteModalOpenState(false);
  };

  return (
    <div className="saved-link">
      <Link
        to="/"
        onClick={() => dispatch(setActiveWeather(location))}
        className="saved-link__link"
      >
        {location.address}
      </Link>

      {/* Rename button */}
      <button
        className="saved-link__edit"
        title="Rename location"
        onClick={() => setRenameModalOpenState(true)}
      >
        <span className="sr-only">Rename location</span>
        <BiEdit />
      </button>

      {/* Rename modal */}
      <Modal
        isOpen={renameModalOpenState}
        onRequestClose={() => setRenameModalOpenState(false)}
        contentLabel="Example Modal"
      >
        <label htmlFor="rename">
          <h4>
            Rename location <strong>{location.address}</strong>
          </h4>
        </label>

        <input
          type="text"
          name="rename"
          id="rename"
          onChange={handleInputChange}
        />

        <button onClick={onRenameButtonClick}>Rename</button>
        <button onClick={() => setRenameModalOpenState(false)}>Cancel</button>
      </Modal>

      {/* Delete button */}
      <button
        onClick={() => setDeleteModalOpenState(true)}
        title="Delete location"
      >
        <MdDeleteForever />
        <span className="sr-only">Delete location</span>
      </button>

      {/* Delete modal */}
      <Modal
        isOpen={deleteModalOpenState}
        onRequestClose={() => setDeleteModalOpenState(false)}
        contentLabel="Example Modal"
      >
        <h4>
          Are you sure you want to delete <strong>{location.address}</strong>
        </h4>

        <button onClick={onDeleteButtonClick}>Delete</button>
        <button onClick={() => setDeleteModalOpenState(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default SavedLocation;

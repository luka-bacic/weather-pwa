import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useContext,
  useState,
  useRef,
} from 'react';
import { GlobalDispatchContext } from 'context';
import {
  setActiveWeatherWithStorage,
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

  const textInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useContext(GlobalDispatchContext);

  // Local state
  const [renameModalOpenState, setRenameModalOpenState] = useState(false);
  const [deleteModalOpenState, setDeleteModalOpenState] = useState(false);
  const [newLocationName, setNewLocationName] = useState(location.address);

  const afterRenameModalOpenHandler = () => {
    if (textInputRef.current !== null) {
      textInputRef.current.focus();
    }
  };

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
    <div className="saved-location">
      <Link
        to="/"
        onClick={() => dispatch(setActiveWeatherWithStorage(location))}
        className="saved-location__link"
      >
        {location.address}
      </Link>

      {/* Rename button */}
      <button
        className="saved-location__edit"
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
        contentLabel="Rename location"
        onAfterOpen={afterRenameModalOpenHandler}
        closeTimeoutMS={300}
        className={{
          base: 'saved-location__modal',
          afterOpen: 'saved-location--modal-after-open',
          beforeClose: 'saved-location--modal-before-close',
        }}
        overlayClassName={{
          base: 'saved-location__modal-overlay',
          afterOpen: 'saved-location--modal-overlay-after-open',
          beforeClose: 'saved-location--modal-overlay-before-close',
        }}
      >
        <label htmlFor="rename">
          <h6>
            Rename location <strong>{location.address}</strong>
          </h6>
        </label>

        <label htmlFor="rename">
          New name:
          <input
            type="text"
            name="rename"
            id="rename"
            className="saved-location__input"
            onChange={handleInputChange}
            ref={textInputRef}
            value={newLocationName}
          />
        </label>

        <div className="saved-location__button-wrap">
          <button
            className="btn btn--inline mr-auto"
            onClick={() => setRenameModalOpenState(false)}
          >
            Cancel
          </button>
          <button className="btn btn--inline" onClick={onRenameButtonClick}>
            Rename
          </button>
        </div>
      </Modal>

      {/* Delete button */}
      <button
        onClick={() => setDeleteModalOpenState(true)}
        title="Delete location"
        className="saved-location__delete"
      >
        <MdDeleteForever />
        <span className="sr-only">Delete location</span>
      </button>

      {/* Delete modal */}
      <Modal
        isOpen={deleteModalOpenState}
        onRequestClose={() => setDeleteModalOpenState(false)}
        contentLabel="Delete location"
        closeTimeoutMS={300}
        className={{
          base: 'saved-location__modal',
          afterOpen: 'saved-location--modal-after-open',
          beforeClose: 'saved-location--modal-before-close',
        }}
        overlayClassName={{
          base: 'saved-location__modal-overlay',
          afterOpen: 'saved-location--modal-overlay-after-open',
          beforeClose: 'saved-location--modal-overlay-before-close',
        }}
      >
        <h6>
          Are you sure you want to delete <strong>{location.address}</strong>?
        </h6>

        <div className="saved-location__button-wrap">
          <button
            className="btn btn--inline mr-auto"
            onClick={() => setDeleteModalOpenState(false)}
          >
            Cancel
          </button>

          <button
            className="btn btn--red-outline btn--inline"
            onClick={onDeleteButtonClick}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SavedLocation;

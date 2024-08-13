"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const NoteModal = ({ isOpen, onClose, noteToEdit, onSave }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const toast = useToast();

  useEffect(() => {
    // When noteToEdit changes, update the state with its values
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setBody(noteToEdit.body);
    } else {
      // Reset the fields if there's no note to edit
      setTitle("");
      setBody("");
    }
  }, [noteToEdit]); // Run this effect whenever noteToEdit changes

  const handleSave = () => {
    const method = noteToEdit ? "put" : "post";
    const url = noteToEdit
      ? `https://studycase-production.up.railway.app/notes/${noteToEdit.id}`
      : `https://studycase-production.up.railway.app/notes/`;

    const noteData = {
      title,
      body,
      createdAt: noteToEdit ? noteToEdit.createdAt : new Date().toISOString(),
    };

    axios[method](url, noteData)
      .then(() => {
        toast({
          title: noteToEdit ? "Note updated" : "Note added",
          description: "Your note has been successfully saved.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onSave();
        onClose();
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "There was an error saving the note.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Error saving note:", error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{noteToEdit ? "Edit Note" : "Add Note"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="title" mb="4">
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
            />
          </FormControl>
          <FormControl id="body">
            <FormLabel>Description</FormLabel>
            <Input
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Note description"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr="3" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NoteModal;

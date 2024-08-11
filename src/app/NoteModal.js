"use client";

import { useState } from "react";
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
  const [title, setTitle] = useState(noteToEdit ? noteToEdit.title : "");
  const [body, setBody] = useState(noteToEdit ? noteToEdit.body : "");
  const toast = useToast();

  const handleSave = () => {
    const method = noteToEdit ? "put" : "post";
    const url = noteToEdit
      ? `https://66b8555e3ce57325ac76e432.mockapi.io/notes/notes/${noteToEdit.id}`
      : `https://66b8555e3ce57325ac76e432.mockapi.io/notes/notes/`;

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

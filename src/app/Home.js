"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Text,
  CardBody,
  CardFooter,
  Heading,
  CardHeader,
  Button,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import NoteModal from "./NoteModal";
import { ConfirmationModal } from "./ConfirmationModal";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios
      .get("https://66b8555e3ce57325ac76e432.mockapi.io/notes/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleViewMore = (id) => {
    navigate(`/notes/${id}`);
  };

  const handleOpenModal = (note) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNoteToEdit(null);
  };

  const handleSave = () => {
    axios
      .get("https://66b8555e3ce57325ac76e432.mockapi.io/notes/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleOpenConfirmModal = (note) => {
    setNoteToDelete(note);
    setIsConfirmOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmOpen(false);
    setNoteToDelete(null);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://66b8555e3ce57325ac76e432.mockapi.io/notes/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
        toast({
          title: "Note deleted.",
          description: "The note was successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
        toast({
          title: "Error.",
          description: "There was an error deleting the note.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <div className="flex flex-col mx-5">
      <div className="text-center w-full my-10">
        <Button
          colorScheme="pink"
          variant="solid"
          onClick={() => handleOpenModal(null)}
        >
          Add Notes
        </Button>
      </div>
      <div className="w-full">
        {notes.length === 0 ? (
          <Alert status="warning" mb="4">
            <AlertIcon />
            <AlertTitle mr={2}>DATA KOSONG BROO</AlertTitle>
            <AlertDescription>
              Isi dulu catatan agar data tidak kosong.
            </AlertDescription>
          </Alert>
        ) : (
          <SimpleGrid
            spacing={54}
            templateColumns="repeat(auto-fill, minmax(25rem, 1fr))"
          >
            {notes.map((note) => (
              <Card key={note.id} className="w-96 h-auto">
                <CardHeader>
                  <Heading size="md">{note.title}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{note.body}</Text>
                  <Text>
                    Created At: {new Date(note.createdAt).toLocaleDateString()}
                  </Text>
                </CardBody>
                <CardFooter className="mb-16">
                  <Button onClick={() => handleViewMore(note.id)}>
                    View here
                  </Button>
                  <Button ml="4" onClick={() => handleOpenModal(note)}>
                    Edit
                  </Button>
                  <Button
                    ml="4"
                    colorScheme="red"
                    onClick={() => handleOpenConfirmModal(note)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </div>
      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        noteToEdit={noteToEdit}
        onSave={handleSave}
      />
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDelete}
        note={noteToDelete}
      />
    </div>
  );
}

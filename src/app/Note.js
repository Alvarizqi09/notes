"use client";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Heading,
  Text,
  Box,
  Card,
  CardHeader,
  CardBody,
  Skeleton,
  VStack,
} from "@chakra-ui/react";

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get(
          `https://66b8555e3ce57325ac76e432.mockapi.io/notes/notes/${id}`
        );
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      padding="4"
    >
      <Card className="w-96 h-auto">
        <CardHeader>
          {loading ? (
            <Skeleton height="20px" width="80%" />
          ) : (
            <Heading size="md">{note.title}</Heading>
          )}
        </CardHeader>
        <CardBody>
          {loading ? (
            <VStack spacing="4">
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="60%" />
            </VStack>
          ) : (
            <>
              <Text>{note.body}</Text>
              <Text>
                Created At: {new Date(note.createdAt).toLocaleDateString()}
              </Text>
            </>
          )}
        </CardBody>
      </Card>
    </Box>
  );
}

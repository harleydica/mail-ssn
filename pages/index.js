import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputLeftAddon,
  InputGroup,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { sendContactForm } from "../lib/api";

const initValues = { name: "", email: "", subject: "", whatsapp: "", message: "" };

const initState = { isLoading: false, error: "", values: initValues };
const prismaoptions = [
  { value: "Prisma 10", label: "Paket PRISMA 10" },
  { value: "Prisma 20", label: "Paket PRISMA 20" },
  { value: "Prisma 30", label: "Paket PRISMA 30" },
];

export default function Home() {
  const toast = useToast();
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      toast({
        title: "Message sent.",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    <Container maxW="450px" mt={12}>
      <Heading>Beli Sekarang</Heading>
      {error && (
        <Text color="red.300" my={4} fontSize="xl">
          {error}
        </Text>
      )}

      <FormControl isRequired isInvalid={touched.name && !values.name} mb={5}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          errorBorderColor="red.300"
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={touched.email && !values.email} mb={5}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          errorBorderColor="red.300"
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl
        mb={5}
        isRequired
        isInvalid={touched.subject && !values.subject}
      >
        <FormLabel>Paket PRISMA</FormLabel>
        <Select
          variant="outline"
          placeholder="Pilih Paket PRISMA"
          name="subject"
          errorBorderColor="red.300"
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlur}
        >
          {prismaoptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl
        mb={5}
        isRequired
        isInvalid={touched.whatsapp && !values.whatsapp}
      >
        <FormLabel>Nomor WhatsApp</FormLabel>
        <InputGroup>
          <InputLeftAddon children="+62" />
          <Input
            type="tel"
            name="whatsapp"
            placeholder="Nomor WhatsApp"
            value={values.whatsapp}
            onChange={handleChange}
            onBlur={onBlur}
            errorBorderColor="red.300"
          />
        </InputGroup>
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={touched.message && !values.message}
        mb={5}
      >
        <FormLabel>Message</FormLabel>
        <Textarea
          type="text"
          name="message"
          rows={4}
          errorBorderColor="red.300"
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <Button
        variant="outline"
        colorScheme="blue"
        isLoading={isLoading}
        disabled={
          !values.name || !values.email || !values.subject || !values.whatsapp || !values.message
        }
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Container>
  );
}
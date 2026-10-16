
import { useState, type FormEvent } from "react";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";

interface LoginPageProps {
    onSignIn: () => void;
}

export function LoginPage({ onSignIn }: LoginPageProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [trustDevice, setTrustDevice] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.trim()) {
            setError("Enter your KBZ Life work email.");
            return;
        }

        if (!password) {
            setError("Enter your password.");
            return;
        }

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        setError("");

        // Demo only: replace with your authentication API.
        onSignIn();
    };

    return (
        <Box minH="100vh" display="flex" bg="white">
            <Box
                display={{ base: "none", lg: "flex" }}
                flex="1"
                bg="#022A41"
                color="white"
                p={12}
                flexDirection="column"
                justifyContent="space-between"
            >
                <Box>
                    <Box
                        as="img"
                        src="/assets/kbzlife-logo-horizontal-white.png"
                        alt="KBZ Life Insurance"
                        maxW="240px"
                        mb={16}
                    />

                    <Heading size="xl" mb={4}>
                        Onboarding, from offer to day one
                    </Heading>

                    <Text color="whiteAlpha.800" lineHeight="tall">
                        Send offers, follow each candidate's progress,
                        review what they submit, and hand a complete
                        file to IT — in one place.
                    </Text>
                </Box>

                <Text fontSize="sm" color="whiteAlpha.700">
                    KBZ Life Insurance · Internal system. Access is logged.
                </Text>
            </Box>

            <Box
                flex="1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={{ base: 5, md: 10 }}
            >
                <Container maxW="md" p={0}>
                    <Box
                        borderWidth="1px"
                        borderColor="gray.200"
                        borderRadius="xl"
                        p={{ base: 5, md: 8 }}
                        boxShadow="lg"
                    >
                        <Text
                            color="blue.600"
                            fontSize="xs"
                            fontWeight="bold"
                            letterSpacing="wider"
                            mb={3}
                        >
                            HR ONBOARDING CONSOLE
                        </Text>

                        <Heading size="xl" mb={3}>
                            Sign in
                        </Heading>

                        <Text color="gray.600" fontSize="sm" mb={6}>
                            Use your KBZ Life work account. Contact IT
                            Service Desk if you cannot get in.
                        </Text>

                        <form onSubmit={handleSubmit}>
                            <Stack spacing={5}>
                                {error && (
                                    <Box
                                        role="alert"
                                        bg="red.50"
                                        color="red.700"
                                        p={3}
                                        borderRadius="md"
                                        fontSize="sm"
                                    >
                                        {error}
                                    </Box>
                                )}

                                <FormControl isRequired>
                                    <FormLabel>Work email</FormLabel>
                                    <Input
                                        type="text"
                                        autoComplete="username"
                                        placeholder="Enter email address / user ID"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>

                                    <InputGroup>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(event.target.value)
                                            }
                                            pr="3rem"
                                        />

                                        <InputRightElement width="3rem">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                aria-label={
                                                    showPassword
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                                onClick={() =>
                                                    setShowPassword((current) => !current)
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={18} />
                                                ) : (
                                                    <Eye size={18} />
                                                )}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <Checkbox
                                    isChecked={trustDevice}
                                    onChange={(event) =>
                                        setTrustDevice(event.target.checked)
                                    }
                                    colorScheme="blue"
                                >
                                    <Box>
                                        <Text fontSize="sm">
                                            Keep me signed in on this device
                                        </Text>
                                        <Text fontSize="xs" color="gray.500">
                                            Only on a KBZ Life managed laptop.
                                        </Text>
                                    </Box>
                                </Checkbox>

                                <Button type="submit" colorScheme="blue" size="lg">
                                    Sign in
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

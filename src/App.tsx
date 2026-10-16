import { useState } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { Candidate, DecisionValues, OfferFormValues } from "./pages/candidates/types/candidates.types";
import { Sidebar } from "./components/layout/sidebar";
import { LoginPage } from "./pages/auth/login_page";
import { Topbar } from "./components/layout/menubar";
import { CandidateListPage } from "./pages/candidates/candidate_list";
import { CandidateReviewPage } from "./pages/candidates/candidate_review";
import { OfferModal } from "./pages/offer/offer_modal";


export type Page = "list" | "review";

const demoCandidates: Candidate[] = [
  {
    id: "CAND-001",
    name: "Su Su Hlaing",
    department: "Bancassurance",
    position: "Sales Executive",
    status: "Submitted",
    completion: 100,
    submittedOn: "2026-10-12",
    startDate: "2026-11-02",
    email: "susu.hlaing@example.com",
    phone: "09 795 123 456",
    manager: "Thandar Win",
    employmentType: "Permanent",
    offerReference: "OFR-2026-0456",
  },
  {
    id: "CAND-002",
    name: "Aung Aung",
    department: "Agency",
    position: "Agency Associate",
    status: "Invited",
    completion: 0,
    startDate: "2026-11-10",
    email: "aung.aung@example.com",
    phone: "09 700 111 222",
    manager: "Thandar Win",
    employmentType: "Probation",
  },
  {
    id: "CAND-003",
    name: "May Thu",
    department: "Head Office",
    position: "Operations Assistant",
    status: "Needs Correction",
    completion: 75,
    submittedOn: "2026-10-09",
    startDate: "2026-11-15",
    email: "may.thu@example.com",
    phone: "09 700 333 444",
    manager: "Thandar Win",
    employmentType: "Contract",
  },
];

export default function App() {
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState<Page>("list");
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>(demoCandidates);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  const selectedCandidate = candidates.find((candidate) => candidate.id === selectedCandidateId);

  const handleOfferSubmit = (offer: OfferFormValues) => {
    const newCandidate: Candidate = {
      id: `CAND-${String(candidates.length + 1).padStart(3, "0")}`,
      name: offer.name,
      department: offer.department || "Other",
      position: offer.position,
      status: "Invited",
      completion: 0,
      startDate: offer.startDate,
      email: offer.email,
      phone: offer.phone,
      manager: offer.manager,
      employmentType: offer.employmentType || "Permanent",
      offerReference: offer.offerReference,
    };

    setCandidates((current) => [newCandidate, ...current]);
    setIsOfferOpen(false);
    toast({
      title: "Demo offer created",
      description: "This only adds a local demo record. Connect the offer API to send a real invitation.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleDecision = (values: DecisionValues) => {
    if (!selectedCandidate) return;

    const status = values.decision === "Approve" ? "Provisioning" : "Needs Correction";
    setCandidates((current) =>
      current.map((candidate) =>
        candidate.id === selectedCandidate.id
          ? {
            ...candidate,
            status,
            startDate: values.joinDate || candidate.startDate,
            notes: values.notes,
            createEmail: values.createEmail,
            prepareLaptop: values.prepareLaptop,
            software: values.software,
          }
          : candidate
      )
    );

    toast({
      title: "Demo decision recorded",
      description: `Candidate status changed to "${status}" locally. Connect your API to persist this decision.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setPage("list");
    setSelectedCandidateId(null);
  };

  if (!isAuthenticated) {
    return <LoginPage onSignIn={() => setIsAuthenticated(true)} />;
  }

  return (
    <Box minH="100vh" w="100%" display="flex" bg="gray.50">
      <Sidebar
        activePage={page}
        candidateCount={candidates.length}
        onNavigate={(nextPage) => setPage(nextPage)}
        onSignOut={() => setIsAuthenticated(false)}
      />

      <Box flex="1" minW={0}>
        <Topbar
          search={search}
          onSearchChange={setSearch}
          onNewOffer={() => setIsOfferOpen(true)}
        />

        {page === "list" && (
          <CandidateListPage
            candidates={candidates}
            search={search}
            onOpenCandidate={(candidate) => {
              setSelectedCandidateId(candidate.id);
              setPage("review");
            }}
          />
        )}

        {page === "review" && selectedCandidate && (
          <CandidateReviewPage
            candidate={selectedCandidate}
            onBack={() => setPage("list")}
            onDecision={handleDecision}
          />
        )}
      </Box>

      <OfferModal
        isOpen={isOfferOpen}
        onClose={() => setIsOfferOpen(false)}
        onSubmit={handleOfferSubmit}
      />
    </Box>
  );
}

import { useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";


function App() {
  const [emailContent, setEmailContent] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [tone, setTone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8081/api/email/generate",
        {
          emailContent,
          tone,
        }
      );

      setGeneratedEmail(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("Failed to generate email reply. Please try again!!!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-around"
      minHeight="80vh"
    >
      <Box>
        <Container sx={{ py: 2 }}>
          <Typography
            variant="h5"
            component="h4"
            gutterBottom
            align="center"
            sx={{ py: 1 }}
          >
            Email Reply Generator
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            label="Original Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="tone-label">Tone (Optional)</InputLabel>
            <Select
              labelId="tone-label"
              value={tone}
              label="Tone (Optional)"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="angry">Angry</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Generate reply"}
          </Button>
        </Container>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
         <Typography
            variant="h5"
            component="h4"
            gutterBottom
            align="center"
            sx={{ py: 1 }}
          >
            Generated Reply
          </Typography>
        <TextField
          fullWidth
          multiline
          rows={15}
          varient="outlined"
          value={generatedEmail || ""}
          inputProps={{ readOnly: true }}
        />

        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigator.clipboard.writeText(generatedEmail)}
        >
          Copy to Clipboard
        </Button>
      </Box>

    </Box>
  );
}

export default App;
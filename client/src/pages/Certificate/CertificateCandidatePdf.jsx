import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

const styles = StyleSheet.create({
  pdfViewer: {
    width: "100%",
    height: "100vh",
  },
  header: {
    flexDirection: "row",
    textAlign: "center",
    gap: "20",
    justifyContent: "center",
  },
  page: {
    flexDirection: "coloumn",
    backgroundColor: "#E4E4E4",
  },

  container: {
    border: "10px dashed double none",
    borderColor: "#2cb1bc",
    padding: 20,
    margin: 40,
  },
  section: {
    textAlign: "center",
    margin: 5,
    padding: 5,
    // flexGrow: 1,
  },
  svg: {
    width: 150,
    height: 150,
  },
  hr: {
    width: "100%",
    border: "1px solid dashed",
  },
  p: {
    textAlign: "center",
    fontSize: "15",
  },
  footer: {
    flexDirection: "row",
    textAlign: "center",
    paddingTop: "20",
    gap: "20",
    justifyContent: "space-between",
  },
});

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/candidate/getsingleCandidateBadge/${params.candidateBadgeId}`
    );
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error;
  }
};
const CertificateCandidatePdf = () => {
  const { result } = useLoaderData();
  console.log(result);
  // Destructure the needed data
  const {
    badgeId,
    createdAt,
    dueDate,
    status,
    note,
    grade,
    examinerId,
    candidateId,
    providerId,
  } = result;

  const badgePhoto = badgeId.badgePhoto;
  const department = badgeId.department;
  const title = badgeId.title;
  const examinerName = `${examinerId.firstName} ${examinerId.familyName}`;
  const candidateName = `${candidateId.firstName} ${candidateId.familyName}`;
  const candidateEmail = candidateId.email;

  const providerName = providerId.providerType;
  // Create a PDF document with the data
  const pdfContent = `
    Badge Photo: ${badgePhoto}
    Department: ${department}
    Title: ${title}
    Created At: ${createdAt}
    Due Date: ${dueDate}
    Status: ${status}
    Note: ${note}
    Grade: ${grade}
    Examiner Name: ${examinerName}
    Candidate Name: ${candidateName}
    Candidate Email: ${candidateEmail}
  `;
  return (
    <div>
      <PDFViewer style={styles.pdfViewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text>----------------</Text>
                <Text>{providerName}</Text>
                <Text>----------------</Text>
              </View>

              <View style={styles.section}>
                <Text>Certificate of Completion</Text>
                <Text>of appreciation</Text>
              </View>

              <View style={styles.section}>
                <Text>{candidateName}</Text>
                <Text style={styles.hr}></Text>
              </View>
              <View style={styles.p}>
                <Text>has successed the {title}</Text>
              </View>
              <View style={styles.footer}>
                <Text> {examinerName}</Text>
                <Text> {candidateName}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default CertificateCandidatePdf;

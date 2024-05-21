import { IEmail, IEmailsFilter } from "../../../@types/emails";
import baseApi from "./baseApi";

export const emailsApiTags = {
  getAllEmails: 'GET_ALL_EMAILS',
};

const emailsApi = baseApi.enhanceEndpoints({ addTagTypes: [...Object.values(emailsApiTags)] }).injectEndpoints({
  endpoints: (build) => ({
    getAllEmails: build.query<{emails: IEmail [], count: number}, IEmailsFilter>({
      query: (params) => ({
        url: "emails",
        params
      }),
      providesTags: [emailsApiTags.getAllEmails],
    }),
    sendNewEmail: build.mutation<void, string>({
      query: (to) => ({
        url: "emails",
        method: 'POST',
        body: {
          to
        },
      }),
      invalidatesTags: (_, error) => (error ? [] : [emailsApiTags.getAllEmails]),
    }),
    updateEmail: build.mutation<void, string>({
      query: (emailId) => ({
        url: `emails/${emailId}`,
        method: 'PUT',
      }),
      invalidatesTags: (_, error) => (error ? [] : [emailsApiTags.getAllEmails]),
    }),
  }),
});

export const {
  useGetAllEmailsQuery,
  useSendNewEmailMutation,
  useUpdateEmailMutation
} = emailsApi;
export default emailsApi;
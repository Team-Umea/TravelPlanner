import Accordion from "../components/smart-components/Accordion";

const FAQS = [
  {
    headline: "How Do I Start Planning My Trip?",
    children: (
      <p>
        To begin your trip planning, you must first create an account and log in. If you do not have
        an account, you can easily sign up by following a few straightforward steps. Once logged in,
        navigate to the trips page where you will find a user-friendly form. Fill out the required
        details to add your trip to the travel planner, allowing you to organize your travel plans
        efficiently.
      </p>
    ),
  },
  {
    headline: "What Features Does the App Offer?",
    children: (
      <p>
        Our app is designed with various features to enhance your travel planning experience. You
        can easily add trips to the travel planner and include specific activities for each trip.
        Additionally, you have the flexibility to edit or delete your planned trips as needed; for
        instance, if you wish to change your destination. Managing the activities associated with
        each trip is also straightforward, enabling you to customize your itinerary according to
        your preferences.
      </p>
    ),
  },
  {
    headline: "How Do I Save My Favorite Destinations?",
    children: (
      <p>
        Currently, the app does not support saving favorite destinations. However, we recognize that
        this feature is highly requested by our users. Our development team is actively exploring
        options to implement a solution that will allow you to save and easily access your favorite
        places in future updates.
      </p>
    ),
  },
  {
    headline: "Is There a Mobile Version of the App?",
    children: (
      <p>
        At this time, the Travel Planner app is exclusively available on the web. Unfortunately, we
        do not have the resources to develop a dedicated mobile app. However, we are continually
        evaluating user feedback and demand, and we may consider a mobile version in the future as
        our resources allow.
      </p>
    ),
  },
  {
    headline: "What Should I Do If I Encounter an Error?",
    children: (
      <p>
        If you encounter an error while using the app, such as issues during sign-up or accessing
        your account, please check for any error messages displayed in the form. Ensure that all
        fields are filled out correctly. Additionally, errors may arise when attempting to delete or
        edit a trip or activity; these may occur due to insufficient permissions. If problems
        persist, please contact our support team for assistance.
      </p>
    ),
  },
  {
    headline: "Are There Any Costs Associated with Using the App?",
    children: (
      <p>
        The Travel Planner app is a non-profit application, meaning it is completely free for users.
        You can take advantage of all the app's features without any associated costs or
        subscription fees, allowing you to plan your travels without financial concerns.
      </p>
    ),
  },
];

export default function FAQPage() {
  return (
    <div className="grow flex flex-col items-center gap-y-[200px] my-[100px]">
      <h2 className="text-2xl font-semibold">
        Frequently Asked Questions: Your Comprehensive Guide to Using Our Travel Planner App
        Effectively
      </h2>
      <ul className="flex flex-col gap-y-[40px] w-[90%] max-w-[500px]">
        {FAQS.map((faq, index) => {
          return (
            <Accordion key={index} headline={faq.headline}>
              {faq.children}
            </Accordion>
          );
        })}
      </ul>
    </div>
  );
}

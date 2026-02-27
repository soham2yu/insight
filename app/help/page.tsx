"use client"

import DashboardNav from "@/components/dashboard-nav"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MessageCircle, FileText, Video, Mail, Phone } from "lucide-react"

const faqData = [
  {
    question: "How do I add a new tenant?",
    answer: "Go to the Tenants page and click the 'Add Tenant' button. Fill in the required information including name, email, phone, and unit assignment."
  },
  {
    question: "How do I create a new lease?",
    answer: "Navigate to the Leases page and click 'Create Lease'. Select a tenant, choose the property unit, set start and end dates, and specify rent amount."
  },
  {
    question: "How do I log a maintenance request?",
    answer: "Go to the Maintenance page and click 'Report Issue'. Provide details about the issue, priority level, and assign it to the appropriate unit and tenant."
  },
  {
    question: "How do I view analytics and reports?",
    answer: "Visit the Analytics page to see charts and graphs for tenant trends, maintenance status, lease activity, and other key metrics."
  },
  {
    question: "How do I export my data?",
    answer: "Go to Settings > Data tab and click 'Export All Data' to download all your property and tenant information."
  },
  {
    question: "How do I change my password?",
    answer: "Navigate to Settings > Security tab. Enter your current password and set a new one, then click 'Update Password'."
  },
  {
    question: "How do I set up notifications?",
    answer: "Go to Settings > Notifications to configure alerts for lease renewals, maintenance requests, payment reminders, and email summaries."
  },
  {
    question: "How do I manage user permissions?",
    answer: "Currently, user permissions are managed at the account level. Contact support if you need to add team members with different access levels."
  }
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
              <p className="text-muted-foreground mt-2">Find answers to common questions and get support</p>
            </div>

            {/* Search Section */}
            <Card className="p-6 mb-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Search Help Articles</h2>
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search for help..."
                    className="pl-10"
                  />
                </div>
              </div>
            </Card>

            {/* FAQ Section */}
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            {/* Contact Support Section */}
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Contact Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get instant help from our support team
                  </p>
                  <Button variant="outline" className="w-full">
                    Start Chat
                  </Button>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send us an email and we'll respond within 24 hours
                  </p>
                  <Button variant="outline" className="w-full">
                    Send Email
                  </Button>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call us for immediate assistance
                  </p>
                  <Button variant="outline" className="w-full">
                    Call Now
                  </Button>
                </div>
              </div>
            </Card>

            {/* Resources Section */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Helpful Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">User Guide</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Comprehensive guide to using Tenant Insights
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      Download PDF
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Video Tutorials</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Step-by-step video guides for common tasks
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      Watch Videos
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}


import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, isToday, isSameDay } from "date-fns";
import AOS from "aos";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: "meeting" | "reminder" | "task";
}

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Meeting",
      date: new Date(),
      time: "10:00 AM - 11:00 AM",
      type: "meeting",
    },
    {
      id: "2",
      title: "Client Presentation",
      date: addDays(new Date(), 2),
      time: "2:00 PM - 3:30 PM",
      type: "meeting",
    },
    {
      id: "3",
      title: "Submit Quarterly Report",
      date: addDays(new Date(), 1),
      time: "EOD",
      type: "task",
    },
    {
      id: "4",
      title: "Follow up with Marketing",
      date: addDays(new Date(), 3),
      time: "12:00 PM",
      type: "reminder",
    },
    {
      id: "5",
      title: "Product Strategy Review",
      date: addDays(new Date(), 4),
      time: "9:00 AM - 10:30 AM",
      type: "meeting",
    },
  ]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const today = new Date();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  const todayEvents = events.filter((event) => 
    isSameDay(event.date, date)
  );

  const typeColors = {
    meeting: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    reminder: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    task: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between" data-aos="fade-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Schedule and manage your events
          </p>
        </div>
        <Button className="bg-keshavSoft-pink hover:bg-keshavSoft-pink/90">
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-3">
        <Card className="md:col-span-3 lg:col-span-1" data-aos="fade-up" data-aos-delay="100">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="border rounded-md p-3"
            />
            
            <div className="mt-6 space-y-2">
              <h3 className="font-medium">Upcoming</h3>
              <div className="space-y-1">
                {events.slice(0, 3).map((event) => (
                  <div 
                    key={event.id} 
                    className="flex items-center justify-between rounded-md border p-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(event.date, "MMM d")} • {event.time}
                      </p>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-xs ${typeColors[event.type]}`}>
                      {event.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-4 lg:col-span-2 space-y-6" data-aos="fade-up" data-aos-delay="200">
          <Tabs defaultValue="day" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <p className="text-sm font-medium">
                  {format(date, "MMMM d, yyyy")}
                </p>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="day">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {format(date, "EEEE, MMMM d")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {todayEvents.length > 0 ? (
                    <div className="space-y-4">
                      {todayEvents.map((event) => (
                        <div 
                          key={event.id} 
                          className="flex items-center gap-4 border-l-4 border-keshavSoft-pink pl-4 pr-2 py-2 rounded-r-md hover:bg-muted/50"
                        >
                          <div className="flex-1">
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.time}</p>
                          </div>
                          <div className={`px-2 py-0.5 rounded-full text-xs ${typeColors[event.type]}`}>
                            {event.type}
                          </div>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted p-4 mb-4">
                        <CalendarComponent className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No events</h3>
                      <p className="text-muted-foreground mt-1">
                        There are no events scheduled for this day.
                      </p>
                      <Button className="mt-4 bg-keshavSoft-pink hover:bg-keshavSoft-pink/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Event
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="week">
              <Card>
                <CardHeader>
                  <CardTitle>Week View</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {weekdays.map((day, index) => (
                      <div key={day} className="text-center">
                        <p className="text-sm font-medium">{day}</p>
                        <div className={`
                          mt-1 flex h-8 w-8 items-center justify-center rounded-full text-sm mx-auto
                          ${isToday(weekDates[index]) ? 'bg-keshavSoft-pink text-white' : ''}
                        `}>
                          {format(weekDates[index], "d")}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 mt-6">
                    {events.slice(0, 5).map((event) => (
                      <div 
                        key={event.id} 
                        className="flex items-center gap-4 border-l-4 border-keshavSoft-pink pl-4 pr-2 py-2 rounded-r-md hover:bg-muted/50"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(event.date, "MMM d")} • {event.time}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="month">
              <Card>
                <CardHeader>
                  <CardTitle>{format(date, "MMMM yyyy")}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Month view is not available in this demo.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

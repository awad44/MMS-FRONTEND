import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Clock, CheckCircle, DollarSign, Users } from 'lucide-react';
import { mockProjects, mockTasks } from '@/lib/mockData';

export default function Projects() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Urban Planning & Projects</h1>
        <p className="text-muted-foreground mt-1">Manage infrastructure and development projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">$2.5M</div>
                <div className="text-sm text-muted-foreground">Total Budget</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">On Hold</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>All active and planned projects</CardDescription>
            </div>
            <Button>Create New Project</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{project.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                        </div>
                        <Badge
                          className={
                            project.status === 'in_progress'
                              ? 'bg-accent'
                              : project.status === 'completed'
                              ? 'bg-success'
                              : project.status === 'planning'
                              ? 'bg-primary'
                              : 'bg-warning'
                          }
                        >
                          {project.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{project.manager}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>
                            ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} />
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Tasks</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Board</CardTitle>
          <CardDescription>Track project tasks and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="in_progress">
            <TabsList>
              <TabsTrigger value="todo">To Do</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
              <TabsTrigger value="done">Done</TabsTrigger>
            </TabsList>
            <TabsContent value="in_progress" className="mt-4">
              <div className="grid gap-4">
                {mockTasks.filter(t => t.status === 'in_progress').map((task) => (
                  <Card key={task.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                          <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                            <span>Assignee: {task.assignee}</span>
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Badge
                          variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'outline'}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
